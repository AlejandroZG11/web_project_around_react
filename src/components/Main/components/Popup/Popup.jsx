export default function Popup(props) {
  const { title, children, onClose } = props;

  return (
    <div className="popup">
      <div className={`popup__content ${!title ? 'popup__photo-content' : ''}`}>
        <button className="popup__close-button" onClick={onClose}></button>
        {children}
      </div>
    </div>
  );
}
