export default function TabBar({tabNames, setTab}) {
  return (
    <div className="tabs">
      {
        tabNames.map(tabName => (
          <span
            key={tabName}
            className="tab"
            onClick={() => setTab(tabName)}
          >
            {tabName}
          </span>
        ))
      }
    </div>
  )
}