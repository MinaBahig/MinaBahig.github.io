const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  const importantStyle = {
    color: note.important ? 'red' : 'black',
  }

  return (
    <li className="note" style={importantStyle}>
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
export default Note