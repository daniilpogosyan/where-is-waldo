export default function TabBar({tabNames, setTab, currentTab}) {
  return (
    <div className="tabs">
      {
        tabNames.map(tabName => (
          <span
            key={tabName}
            className={currentTab === tabName ? "tab tab--active" : "tab"}
            onClick={() => setTab(tabName)}
          >
            {tabName}
          </span>
        ))
      }
    </div>
  )
}