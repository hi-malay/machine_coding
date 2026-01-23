import "./App.css";
import { useState } from "react";
import FolderStructure from "./questions/folder-structure";
import Stopwatch from "./questions/stopwatch";
import Rating from "./questions/rating";
import Multiprogress from "./questions/multiprogress";
import BublingCapturing from "./questions/bubbling-capturing";
import GridGame from "./questions/grid-game";
import VirtulizedTable from "./questions/virtulized-table";
import CircleTouch from "./questions/circle-touch";
import TrafficLight from "./questions/traffic-light";
import TicTacToe from "./questions/tic-tac";
import NestedCheckBox from "./questions/nested-checkbox";
import TransferList from "./questions/transfer-list";
import AreaSelector from "./questions/area-selector";
import NestedComment from "./questions/nested-comment";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

const folderStructure = [
  {
    name: "Personal",
    type: "folder",
    children: [
      {
        name: "Documents",
        type: "folder",
        children: [
          { name: "Resume.docx", type: "file" },
          { name: "CoverLetter.docx", type: "file" },
        ],
      },
      {
        name: "Photos",
        type: "folder",
        children: [
          {
            name: "Vacation",
            type: "folder",
            children: [
              { name: "beach.png", type: "file" },
              { name: "mountains.png", type: "file" },
            ],
          },
          { name: "Family.png", type: "file" },
        ],
      },
      { name: "todo.txt", type: "file" },
    ],
  },
  {
    name: "Private",
    type: "folder",
    children: [
      { name: "Resume.docx", type: "file" },
      { name: "CoverLetter.docx", type: "file" },
    ],
  },
];

const nestedData = [
  {
    id: 1,
    label: "Fruits",
    children: [
      { id: 2, label: "Apple" },
      { id: 3, label: "Banana" },
    ],
  },
  {
    id: 4,
    label: "Vegetables",
    children: [
      {
        id: 5,
        label: "Leafy",
        children: [
          { id: 6, label: "Spinach" },
          { id: 7, label: "Lettuce" },
        ],
      },
    ],
  },
];

const transferData = [
  { label: "USA", id: 1 },
  { label: "India", id: 2 },
  { label: "China", id: 3 },
  { label: "Japan", id: 4 },
  { label: "Coorg", id: 5 },
];

const nestedComment = [
  {
    id: 1,
    text: "This is a comment",
    replies: [
      {
        id: 2,
        text: "This is a reply",
        replies: [],
      },
    ],
  },
];

function App() {
  const [activeChallenge, setActiveChallenge] = useState("folder-structure");
  const [checkbox, setCheckbox] = useState({});
  const [commentData, setCommentData] = useState(nestedComment);
  const [input, setInput] = useState("");

  const handleCommentChange = (e) => {
    setInput(e.target.value);
  };

  const challenges = [
    {
      id: "folder-structure",
      name: "Folder Structure",
      component: <FolderStructure data={folderStructure} />,
    },
    { id: "stopwatch", name: "Stopwatch", component: <Stopwatch /> },
    { id: "rating", name: "Rating", component: <Rating rating={3.5} /> },
    {
      id: "multiprogress",
      name: "Multi Progress",
      component: <Multiprogress />,
    },
    {
      id: "bubbling",
      name: "Bubbling & Capturing",
      component: <BublingCapturing />,
    },
    { id: "grid-game", name: "Grid Game", component: <GridGame list={16} /> },
    {
      id: "virtulized-table",
      name: "Virtualized Table",
      component: <VirtulizedTable table={16} />,
    },
    { id: "circle-touch", name: "Circle Touch", component: <CircleTouch /> },
    { id: "traffic-light", name: "Traffic Light", component: <TrafficLight /> },
    { id: "tic-tac-toe", name: "Tic Tac Toe", component: <TicTacToe /> },
    {
      id: "nested-checkbox",
      name: "Nested Checkbox",
      component: (
        <NestedCheckBox
          data={nestedData}
          checkbox={checkbox}
          setCheckbox={setCheckbox}
        />
      ),
    },
    {
      id: "transfer-list",
      name: "Transfer List",
      component: <TransferList transferData={transferData} />,
    },
    {
      id: "area-selector",
      name: "Area Selector",
      component: <AreaSelector row={10} col={10} />,
    },
    {
      id: "nested-comment",
      name: "Nested Comment",
      component: (
        <>
          {" "}
          <div className="flex gap-5">
            <Input
              type="text"
              className="w-80 mb-5"
              placeholder="Add a comment"
              onChange={(e) => handleCommentChange(e)}
            />
            <Button
              type="button"
              className="w-40 mb-5"
              onClick={() => {
                if (input) {
                  setCommentData((prev) => [
                    ...prev,
                    {
                      id: prev.length + 1 + "_parent",
                      text: input,
                      replies: [],
                    },
                  ]);
                }
              }}
            >
              Add Comment
            </Button>
          </div>
          <NestedComment
            key={0.2 + "_parent"}
            commentData={commentData}
            setCommentData={setCommentData}
          />
        </>
      ),
    },
  ];

  const currentChallenge = challenges.find((c) => c.id === activeChallenge);
  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="sidebar-title">
          <span>⚡</span> Machine Coding
        </div>
        <ul className="nav-list">
          {challenges.map((challenge) => (
            <li
              key={challenge.id}
              className={`nav-item ${activeChallenge === challenge.id ? "active" : ""}`}
              onClick={() => setActiveChallenge(challenge.id)}
            >
              {challenge.name}
            </li>
          ))}
        </ul>
      </nav>

      <main className="main-content">
        <div className="challenge-header">
          <h1 className="challenge-title">{currentChallenge?.name}</h1>
          <p className="challenge-subtitle">
            Frontend Interview Challenge Solution
          </p>
        </div>

        <div className="challenge-card">{currentChallenge?.component}</div>
      </main>
    </div>
  );
}

export default App;
