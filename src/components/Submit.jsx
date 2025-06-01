export default function Submit({ btnLabel }) {
  return (
    <>
      <div className="data">
        <button className="submit" type="submit">
          {btnLabel}
        </button>
      </div>
    </>
  );
}
