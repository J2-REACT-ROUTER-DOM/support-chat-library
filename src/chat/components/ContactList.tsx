import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getClients } from "@/fake/fake-data";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { NavLink } from "react-router";

export const ContactList = () => {
  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
    //Considera el query fresco por 5 minutos y vuelve a hacer la consulta si pasa ese tiempo
    staleTime: 1000 * 60 * 5,
  });
  return (
    <ScrollArea className="h-[calc(100vh-160Px)]">
      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h3 className="px-2 text-sm font-semibold">Contacts</h3>
          <div className="space-y-1">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="w-4 h-4 animate-spin" />
                <div>Cargando...</div>
              </div>
            )}
            {/* La diferencia del NavLink con Link es que Navlink me permite dar estilos segun en la ruta donde me encuentre */}
            {clients?.map((client) => (
              <NavLink
                to={`/chat/${client.id}`}
                key={client.id}
                //! NavLink me permite dar estilos usando un callback en el className usando isActive, isPending, isVisited,isTransitioning
                className={({ isActive }) =>
                  `w-full flex items-center mt-3 transition-all duration-300 ${
                    isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"
                  }`
                }
              >
                <div className="h-6 w-6 rounded-full bg-gray-400 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
                  {client.name.charAt(0)}
                </div>
                <span className="text-gray-600 text-sm">{client.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t mt-4">
          <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              TM
            </div>
            Thomas Miller
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-red-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              SB
            </div>
            Sarah Brown
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};
