export default function Submit({ btnLabel, disable }) {
  return (
    <>
      <div className="data">
        <button className="submit" type="submit" disabled={disable}>
          {btnLabel}
        </button>
      </div>
    </>
  );
}
