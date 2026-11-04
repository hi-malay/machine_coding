const DragDropKanban = () => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("id", e.target.id);
    console.log("id", e.target.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    console.log("id", id, e.target.id);
    e.currentTarget.appendChild(document.getElementById(id));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <section
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        key="1"
        id="dashboard-1"
        className="dashboard h-400, w-200 m-6 bg-slate-100 rounded-lg border-slate-300 box-shadow-lg p-4"
      >
        <div
          id="card-1"
          draggable
          onDragStart={handleDragStart}
          className="p-2 m-2 bg-slate-200 rounded-lg w-full"
        >
          Dasboard one
        </div>
        <div
          id="card-2"
          draggable
          onDragStart={handleDragStart}
          className="p-2 m-2 bg-slate-200 rounded-lg w-full"
        >
          Dasboard one
        </div>
        <div
          id="card-3"
          draggable
          onDragStart={handleDragStart}
          className="p-2 m-2 bg-slate-200 rounded-lg w-full"
        >
          Dasboard one
        </div>
      </section>
      <section
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        key="2"
        id="dashboard-2"
        className="dashboard h-400, w-200 m-6 bg-slate-100 rounded-lg border-slate-300 box-shadow-lg p-4"
      >
        <div
          id="card-4"
          draggable
          onDragStart={handleDragStart}
          className="p-2 m-2 bg-slate-200 rounded-lg w-full"
        >
          Dashboard Two
        </div>
      </section>
      <section
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        key="3"
        id="dashboard-3"
        className="dashboard h-400, w-200 m-6 bg-slate-100 rounded-lg border-slate-300 box-shadow-lg p-4"
      >
        <div
          id="card-5"
          draggable
          onDragStart={handleDragStart}
          className="p-2 m-2 bg-slate-200 rounded-lg w-full"
        >
          Dashboard Three
        </div>
      </section>
    </div>
  );
};

export default DragDropKanban;
