"use client";
import { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

interface Card {
  id: number;
  text: string;
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      text: "This is a dummy text that is initially shown partially. Click 'Show More' to see the full text.",
    },
  ]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const handleShowMore = (cardId: number) => {
    const card = cards.find((card) => card.id === cardId);
    if (card) {
      setSelectedCard(card);
    }
  };

  return (
    <div className="w-screen h-screen overflow-auto relative bg-gray-200 p-6">
      {cards.map((card) => (
        <Draggable key={card.id} bounds="parent">
          <ResizableBox
            width={300}
            height={200}
            minConstraints={[200, 150]}
            maxConstraints={[600, 500]}
            className="relative bg-white border border-gray-300 rounded-lg shadow-xl transition-transform transform hover:scale-105 ease-in-out duration-300"
            handle={
              <span className="absolute right-0 bottom-0 p-3 bg-gray-600 text-white cursor-se-resize" />
            }
          >
            <div className="relative h-full p-4">
              <p className="text-gray-800 text-base mb-4">
                {card.text.substring(0, 70)}...
              </p>

              <button
                className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
                onClick={() => handleShowMore(card.id)}
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-white px-7 text-sm font-medium text-black backdrop-blur-3xl gap-2 undefined">
                  Show More
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </ResizableBox>
        </Draggable>
      ))}
      {selectedCard && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 p-8 bg-white border border-gray-300 rounded-lg shadow-2xl z-50 animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Card Details
          </h2>
          <p className="text-gray-700 mb-6">{selectedCard.text}</p>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={() => setSelectedCard(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
