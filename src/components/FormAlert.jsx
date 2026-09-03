export default function FormAlert({ children }) {
  if (!children) return null;
  return (
    <div className="form-alert" role="alert">
      {children}
    </div>
  );
}
