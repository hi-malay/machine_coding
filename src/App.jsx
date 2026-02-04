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
import { Code, Terminal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { Checkbox } from "./components/ui/checkbox";
import StrechDiv from "./questions/strech-div";

const folderStructure = [
  {
    name: "Personal",
    type: "folder",
    id: 1,
    children: [
      {
        name: "Documents",
        type: "folder",
        id: 2,
        children: [
          { name: "Resume.docx", type: "file", id: 3 },
          { name: "CoverLetter.docx", type: "file", id: 4 },
        ],
      },
      {
        name: "Photos",
        type: "folder",
        id: 5,
        children: [
          {
            name: "Vacation",
            type: "folder",
            id: 6,
            children: [
              { name: "beach.png", type: "file", id: 7 },
              { name: "mountains.png", type: "file", id: 8 },
            ],
          },
          { name: "Family.png", type: "file", id: 9 },
        ],
      },
      { name: "todo.txt", type: "file", id: 10 },
    ],
  },
  {
    name: "Private",
    type: "folder",
    id: 11,
    children: [
      { name: "Resume.docx", type: "file", id: 12 },
      { name: "CoverLetter.docx", type: "file", id: 13 },
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
  const [completedChallenges, setCompletedChallenges] = useState({});
  const [commentData, setCommentData] = useState(nestedComment);
  const [input, setInput] = useState("");
  const [folderData, setFolderData] = useState(folderStructure);

  const toggleChallengeCompletion = (id) => {
    setCompletedChallenges((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCommentChange = (e) => {
    setInput(e.target.value);
  };

  const challenges = [
    {
      id: "folder-structure",
      name: "Folder Structure",
      component: (
        <FolderStructure
          folderData={folderData}
          setFolderData={setFolderData}
        />
      ),
      fileName: "folder-structure.jsx",
    },
    {
      id: "stopwatch",
      name: "Stopwatch",
      component: <Stopwatch />,
      fileName: "stopwatch.jsx",
    },
    {
      id: "rating",
      name: "Rating",
      component: <Rating rating={3.5} />,
      fileName: "rating.jsx",
    },
    {
      id: "multiprogress",
      name: "Multi Progress",
      component: <Multiprogress />,
      fileName: "multiprogress.jsx",
    },
    {
      id: "bubbling",
      name: "Bubbling & Capturing",
      component: <BublingCapturing />,
      fileName: "bubbling-capturing.jsx",
    },
    {
      id: "grid-game",
      name: "Grid Game",
      component: <GridGame list={16} />,
      fileName: "grid-game.jsx",
    },
    {
      id: "virtulized-table",
      name: "Virtualized Table",
      component: <VirtulizedTable table={16} />,
      fileName: "virtulized-table.jsx",
    },
    {
      id: "circle-touch",
      name: "Circle Touch",
      component: <CircleTouch />,
      fileName: "circle-touch.jsx",
    },
    {
      id: "traffic-light",
      name: "Traffic Light",
      component: <TrafficLight />,
      fileName: "traffic-light.jsx",
    },
    {
      id: "tic-tac-toe",
      name: "Tic Tac Toe",
      component: <TicTacToe />,
      fileName: "tic-tac.jsx",
    },
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
      fileName: "nested-checkbox.jsx",
    },
    {
      id: "transfer-list",
      name: "Transfer List",
      component: <TransferList transferData={transferData} />,
      fileName: "transfer-list.jsx",
    },
    {
      id: "area-selector",
      name: "Area Selector",
      component: <AreaSelector row={10} col={10} />,
      fileName: "area-selector.jsx",
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
      fileName: "nested-comment.jsx",
    },
    {
      id: "strech-div",
      name: "Strech Div",
      component: <StrechDiv />,
      fileName: "strech-div.jsx",
    },
  ];

  const currentChallenge = challenges.find((c) => c.id === activeChallenge);
  return (
    <div className="app-container">
      <nav className="sidebar">
        <Accordion
          type="multiple"
          defaultValue={["machine-coding"]}
          className="w-full"
        >
          <AccordionItem value="machine-coding" className="border-none">
            <AccordionTrigger className="hover:no-underline py-2">
              <div className="sidebar-title mb-0">
                <Terminal size={20} className="text-indigo-600" />
                <span>Machine Coding</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="nav-list mt-2">
                {challenges.map((challenge) => (
                  <li
                    key={challenge.id}
                    className={`nav-item flex items-center justify-between gap-2 ${
                      activeChallenge === challenge.id ? "active" : ""
                    }`}
                    onClick={() => setActiveChallenge(challenge.id)}
                  >
                    <span className="flex-1">{challenge.name}</span>
                    <div className="flex items-center">
                      <Checkbox
                        id={`complete-${challenge.id}`}
                        checked={completedChallenges[challenge.id] || false}
                        onCheckedChange={(value) =>
                          toggleChallengeCompletion(value)
                        }
                        className={`transition-colors ${
                          activeChallenge === challenge.id
                            ? "border-white data-[state=checked]:bg-white data-[state=checked]:text-indigo-600"
                            : "border-slate-300"
                        }`}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>

      <main className="main-content">
        <div className="challenge-header">
          <div className="flex items-center gap-3">
            <h1 className="challenge-title">{currentChallenge?.name}</h1>
            <a
              href={`https://github.com/hi-malay/machine_coding/blob/main/src/questions/${currentChallenge?.fileName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="code-link"
              title="View Source on GitHub"
            >
              <Code size={40} />
            </a>
          </div>
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
