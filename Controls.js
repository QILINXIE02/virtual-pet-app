export default function Controls({ onFeed, onPlay, onRest }) {
  return `
    <div id="controls">
      <button id="feed">Feed</button>
      <button id="play">Play</button>
      <button id="rest">Rest</button>
    </div>
  `;
}
