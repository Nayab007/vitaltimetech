"use client";
import { useRef, useState } from 'react';


export default function Home() {
  const [people, setPeople] = useState([
    { id: 1, name: 'Scotland Island', content: 'Sydney, Australia', image: '/images/image1.png' },
    { id: 2, name: 'The Charles Grand Basserie & Bar', content: 'Lorem ipsum, Dolor', image: '/images/image2.png' },
    { id: 3, name: 'Bridge Climb', content: 'Dolor, Sit amet', image: '/images/image3.png' },
    { id: 4, name: 'Scotland Island', content: 'Etcetera veni, Vidi vici', image: '/images/image4.png' },
    { id: 5, name: 'Clam Bar', content: 'Sydney, Australia', image: '/images/image5.png' },
    { id: 6, name: 'Vivid Festival', content: 'Sydney, Australia', image: '/images/image6.png' },
  ]);

  const dragItem = useRef(null);
  const draggedOverItem = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  function handleDragStart(event, index) {
    dragItem.current = index;
    setHoveredItem(null); // Reset hovered item
    event.dataTransfer.setData('text/plain', ''); // Required for Firefox
  }

  function handleDragEnter(index) {
    draggedOverItem.current = index;
    if (dragItem.current !== draggedOverItem.current) {
      // Swap positions in the array for visual feedback
      const updatedPeople = [...people];
      const temp = updatedPeople[dragItem.current];
      updatedPeople[dragItem.current] = updatedPeople[draggedOverItem.current];
      updatedPeople[draggedOverItem.current] = temp;
      setPeople(updatedPeople);
      dragItem.current = draggedOverItem.current;
    }
  }

  function handleDragEnd() {
    dragItem.current = null;
    draggedOverItem.current = null;
  }

  function handleMouseEnter(index) {
    setHoveredItem(index);
  }

  function handleMouseLeave() {
    setHoveredItem(null);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center space-y-1">
        <h1 className="text-xl font-bold mt-4">{dragItem.current !== null ? people[dragItem.current].name : 'Draggable List'}</h1>
        {/* List of items */}
        {people.map((person, index) => (
          <div
            key={person.id}
            className={`relative flex space-x-3 border rounded p-2 bg-gray-100 ${hoveredItem === index ? 'hover-effect' : ''} ${dragItem.current === index ? 'dragging-effect' : ''}`}
            style={{
              width: '400px',
              zIndex: dragItem.current === index ? 1 : 'auto',
              boxShadow: dragItem.current === index || hoveredItem === index ? '0px 8px 20px rgba(0, 0, 0, 0.2)' : 'none',
              transform: dragItem.current === index || hoveredItem === index ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {person.image && (
              <img
                src={person.image}
                alt={person.name}
                className="w-16 h-16 object-cover rounded-[5px]"
              />
            )}
            <div className="flex flex-col">
              <p className="font-normal whitespace-nowrap overflow-hidden">{person.name}</p>
              <div className="flex items-center">
                {/* Render the SVG icon */}
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 11 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.24987 1.5C3.7495 1.5 2.5332 2.71629 2.5332 4.21667C2.5332 5.717 3.7495 6.9333 5.24987 6.9333C6.75024 6.9333 7.9665 5.717 7.9665 4.21667C7.9665 2.71629 6.75024 1.5 5.24987 1.5ZM1.0332 4.21667C1.0332 1.88787 2.92107 0 5.24987 0C7.5787 0 9.4665 1.88787 9.4665 4.21667C9.4665 6.2895 7.9709 8.0129 6 8.3668V11.25C6 11.6642 5.66421 12 5.25 12C4.83579 12 4.5 11.6642 4.5 11.25V8.3669C2.52894 8.0131 1.0332 6.2895 1.0332 4.21667ZM0.75 13C0.33579 13 0 13.3358 0 13.75C0 14.1642 0.33579 14.5 0.75 14.5H9.75C10.1642 14.5 10.5 14.1642 10.5 13.75C10.5 13.3358 10.1642 13 9.75 13H0.75Z"
                    fill="#A8A9AE"
                  />
                </svg>
                {/* Display the content */}
                <p className="text-sm text-gray-400 overflow-hidden">{person.content}</p>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

