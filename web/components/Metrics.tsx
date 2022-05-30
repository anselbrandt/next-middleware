import type { NextPage } from "next";
import { getPaths, getReferrs, getWebvitals } from "../utils";

interface Props {
  keys: string[] | undefined;
}

const Metrics: NextPage<Props> = ({ keys }) => {
  const data = keys as string[];
  const paths = getPaths(data);
  const referrers = getReferrs(data);
  const webvitals = getWebvitals(data);
  const width = "425px";
  return (
    <>
      {keys && (
        <div>
          <div>
            <div>Paths</div>
            <div style={{ width: width }}>
              {paths!.map((path, index) => (
                <div
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{path.route}</div>
                  <div>{path.count}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>Referrers</div>
            <div style={{ width: width }}>
              {referrers!.map((referrer, index) => (
                <div
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{referrer.referrer}</div>
                  <div>{referrer.count}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            {webvitals!.map((vital, index) => (
              <div key={index}>
                <div>{vital.path}</div>
                <div>
                  {vital.metrics.map((metric, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>{metric.vital}</div>
                      <div>{metric.max}ms</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Metrics;
