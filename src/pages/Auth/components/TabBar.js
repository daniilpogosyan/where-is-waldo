import style from './TabBar.module.css';

export default function TabBar({tabNames, setTab, currentTab}) {
  return (
    <div className={style["tabs"]}>
      {tabNames.map((tabName) => {
        const className = (
          `${style['tab']} ${tabName === currentTab ? style['active'] : ''}`
        );

        return (
          <span
            key={tabName}
            className={className}
            onClick={() => setTab(tabName)}
          >
            {tabName}
          </span>
        )
      })}
    </div>
  )
}