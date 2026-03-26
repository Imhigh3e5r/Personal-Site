export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-name">Muhammed Ozturk</div>
        <div className="footer-line">
          &copy; {new Date().getFullYear()} &middot; Built with focus and intention.
        </div>
      </div>
    </footer>
  );
}
