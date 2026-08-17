import { useNavigate } from "react-router-dom";
import { useGetMyConversationsQuery } from "../api/chatApi";

const ConversationList = () => {
  const navigate = useNavigate();

  const {
    data: conversations,
    isLoading,
    error,
  } = useGetMyConversationsQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Mesajlar yüklənir...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-sm text-red-500">
        Conversation-lar yüklənmədi.
      </div>
    );
  }

  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-400">
          Hələ mesajınız yoxdur.
        </p>
      </div>
    );
  }

  const handleConversationClick = (
    conversationId: number
  ) => {
    navigate(`/messagePage/${conversationId}`);
  };

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Mesajlar
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Söhbətləriniz
        </p>
      </div>

     

      <div>
        {conversations.map((conversation) => (

          <button
            key={conversation.conversationId}
            type="button"
            onClick={() =>
              handleConversationClick(
                conversation.conversationId
              )
            }
            className="flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 text-left transition hover:bg-gray-50"
          >

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-600">
              {conversation.otherUserName
                ?.charAt(0)
                ?.toUpperCase()}
            </div>


            <div className="min-w-0 flex-1">

              <div className="flex items-center justify-between">

                <h3 className="truncate font-semibold text-gray-900">
                  {conversation.otherUserName}
                </h3>

              </div>

              <p className="mt-1 text-sm text-gray-400">
                Söhbətə davam et
              </p>

            </div>

            <div className="text-gray-400">
              →
            </div>

          </button>

        ))}
      </div>

    </div>
  );
};

export default ConversationList;