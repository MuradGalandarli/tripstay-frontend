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
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
        <p className="text-base text-gray-500">
          Mesajlar yüklənir...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-xl rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">

          <p className="text-base text-red-500">
            Conversation-lar yüklənmədi.
          </p>

          
        </div>
      </div>
    );
  }

  const handleConversationClick = (
    conversationId: number
  ) => {
    navigate(`/messagePage/${conversationId}`);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">

        <div className="flex h-24 w-full items-center justify-between px-8 lg:px-12">

          <div className="flex items-center gap-5">

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Mesajlar
              </h1>
            </div>

          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Ana səhifə
          </button>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="w-full px-6 py-8 lg:px-10 lg:py-10">

        <div className="w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          {/* =================================================
              TITLE
          ================================================= */}

          <div className="border-b border-gray-100 px-8 py-7">

            <h2 className="text-2xl font-semibold text-gray-900">
              Söhbətlər
            </h2>

          </div>


          {/* =================================================
              EMPTY
          ================================================= */}

          {!conversations ||
          conversations.length === 0 ? (

            <div className="flex min-h-[600px] flex-col items-center justify-center px-6">

              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-3xl">
                💬
              </div>

              <p className="text-base text-gray-400">
                Hələ mesajınız yoxdur.
              </p>

            </div>

          ) : (

            /* =================================================
               CONVERSATIONS
            ================================================= */

            <div className="w-full">

              {conversations.map(
                (conversation) => (

                  <button
                    key={
                      conversation.conversationId
                    }
                    type="button"
                    onClick={() =>
                      handleConversationClick(
                        conversation.conversationId
                      )
                    }
                    className="group flex min-h-[100px] w-full items-center gap-6 border-b border-gray-100 px-8 py-6 text-left transition hover:bg-gray-50 lg:px-10"
                  >

                    {/* =================================================
                        AVATAR
                    ================================================= */}

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xl font-semibold text-gray-600">
                      {conversation.otherUserName
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>


                    {/* =================================================
                        USER
                    ================================================= */}

                    <div className="min-w-0 flex-1">

                      <h3 className="truncate text-lg font-semibold text-gray-900">
                        {conversation.otherUserName}
                      </h3>

                    </div>


                    {/* =================================================
                        ARROW
                    ================================================= */}

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl text-gray-400 transition group-hover:bg-gray-200 group-hover:text-gray-700">
                      →
                    </div>

                  </button>

                )
              )}

            </div>

          )}

        </div>

      </main>

    </div>
  );
};

export default ConversationList;