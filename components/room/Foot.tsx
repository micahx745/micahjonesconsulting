// components/room/Foot.tsx — section 09, the foot.
//
// Pass-101 phase 2. Three label rows on espresso: the address, the promise, the
// name. The mailto and the reply promise are live strings.
export function Foot() {
  return (
    <footer className="foot">
      <div className="row">
        <a className="l now" href="mailto:micah@micahjonesconsulting.com">
          micah@micahjonesconsulting.com
        </a>
        <span className="l">
          I read every message and reply inside one business day.
        </span>
        <span className="l">Micah Jones</span>
      </div>
    </footer>
  );
}
