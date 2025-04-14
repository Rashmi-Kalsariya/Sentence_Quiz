function Timer({ timeRemaining }) {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center">
        <span className="text-xl font-bold text-blue-500">{timeRemaining}</span>
      </div>
    </div>
  );
}

export default Timer;