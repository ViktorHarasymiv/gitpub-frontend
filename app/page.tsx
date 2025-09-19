export default function DashboardPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <ul>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#my-day" />
          </svg>
          <p>my-day</p>
        </li>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#journey" />
          </svg>
          <p>journey</p>
        </li>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#profile" />
          </svg>
          <p>profile</p>
        </li>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#dairy" />
          </svg>
          <p>dairy</p>
        </li>

        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#exit" />
          </svg>
          <p>exit</p>
        </li>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#burger" />
          </svg>
          <p>burger</p>
        </li>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#arrow-right" />
          </svg>
          <p>arrow-right</p>
        </li>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#plus" />
          </svg>
          <p>plus</p>
        </li>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#close_btn" />
          </svg>
          <p>close_btn</p>
        </li>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#note" />
          </svg>
          <p>note</p>
        </li>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#arrow_down" />
          </svg>
          <p>arrow_down</p>
        </li>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#eat" />
          </svg>
          <p>eat</p>
        </li>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#activity" />
          </svg>
          <p>activity</p>
        </li>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#rest" />
          </svg>
          <p>rest</p>
        </li>
        <li>
          <svg width="20" height="22">
            <use href="/sprite.svg#delete" />
          </svg>
          <p>delete</p>
        </li>
      </ul>
    </div>
  );
}
