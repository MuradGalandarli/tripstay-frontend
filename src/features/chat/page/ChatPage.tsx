import { useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";

export default function ChatPage() {
  const { propertyId } = useParams();


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <ChatWindow propertyId={Number(propertyId)} />
    </div>
  );
}