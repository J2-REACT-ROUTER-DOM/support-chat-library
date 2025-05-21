import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Copy,
  Download,
  ThumbsUp,
  ThumbsDown,
  Send,
  MessageSquare,
} from "lucide-react";
import { useParams } from "react-router";
import { getClientMessages, sendMessage } from "@/fake/fake-data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Message } from "../interfaces/chat.interfaces";

// interface Message {
//   role: "agent" | "user"
//   content: string
//   timestamp: string
// }

export default function ChatPage() {
  const { id } = useParams();
  //console.log("🚀", id)
  const [input, setInput] = useState("");

  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    //! definimos las key para que se cacheen los mensajes
    queryKey: ["messages", id],
    queryFn: () => getClientMessages(id!),
    enabled: id !== undefined,
    staleTime: 1000 * 60 * 5, //5 minutos
  });

  const { mutate: sendMessageMutation } = useMutation({
    //mutationFn: (msg: Omit<Message, "id" | "like">)=>sendMessage(msg),
    mutationFn: sendMessage,

    //!newMessage es lo que devuelve la mutacion
    onSuccess: (newMessage) => {
      //console.log("🚀", newMessage);

      //!Buscamos los dato con la key messages y el id del cliente y luego configuramos un nuevo array con los mensajes antiguos y el nuevo mensaje
      queryClient.setQueryData(["messages", id], (oldMessages: Message[]) => [
        ...oldMessages,
        newMessage,
      ]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessageMutation({
      clientId: id!,
      content: input,
      sender: "agent",
      createdAt: new Date(),
    });
    setInput("");
  };
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <div className="mt-2 text-sm text-muted-foreground">
          Loading messages...
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="w-full">
              {message.sender === "client" ? (
                // Agent message - left aligned
                <div className="flex gap-2 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">NexTalk</span>
                      <span className="text-sm text-muted-foreground">
                        {message.createdAt.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // User message - right aligned
                <div className="flex flex-col items-end">
                  <div className="text-right mb-1">
                    <span className="text-sm font-medium mr-2">G5</span>
                    <span className="text-sm text-muted-foreground">
                      {message.createdAt.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {messages.length == 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
          <div className="text-sm text-muted-foreground">
            No messages in this conversation yet
          </div>
          <div className="text-xs text-muted-foreground/70">
            Start typing to begin chatting
          </div>
        </div>
      )}
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <Textarea
              placeholder="Type a message as a customer"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[44px] h-[44px] resize-none py-3"
            />
            <Button className="h-[44px] px-4 flex items-center gap-2">
              <Send className="h-4 w-4" />
              <span>Send</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
