import { getClient } from "@/fake/fake-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { NoContactSelected } from "../NoContactSelected";
import { ContactInfoSkeleton } from "./ContactInfoSkeleton";
import { ContactInfo } from "./ContactInfo";

export const ContactDetails = () => {
  const { id } = useParams();

  const { data: client, isLoading } = useQuery({
    queryKey: ["contact", id],
    queryFn: () => getClient(id!),
    //!Hace la busqueda si clientId no es undefined
    enabled: id !== undefined,
    staleTime: 1000 * 60 * 5, //5 minutos
  });

  if (!id) {
    return <NoContactSelected />;
  }
  if (isLoading && !client) {
    return <ContactInfoSkeleton />;
  }
  if (client) {
    return <ContactInfo client={client} />;
  }

  return <div>Client not found</div>;
};
