const BioItem = ({ label, children }) => (
  <div className="mb-6">
    <h1 className="text-md uppercase tracking-wider text-orange-500 font-medium ">
      {label}
    </h1>
    <div className="text-base">{children}</div>
  </div>
);

export default BioItem