export default function Popup(props) {
  const { title, children, onClose } = props;

  return (
    <div className="popup">
      <div className="popup__overlay"></div>
      <div className={`popup__content ${!title ? 'popup__photo-link' : ''}`}>
        <button className="popup__close-button" onClick={onClose}></button>

        {children}
      </div>
    </div>
  );
}
