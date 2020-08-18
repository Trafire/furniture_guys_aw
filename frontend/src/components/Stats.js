import React, {useContext, useState} from 'react';
import {statsServices} from "../services";
import {Store} from "./Store";

export const Stats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const globalState = useContext(Store);
  if (loading) {
    statsServices.getStats().then(response => {
      setStats(response);
      setLoading(false)
    });
  } else {
    console.log(stats);


    return (
      <div>
        <h1>Stats</h1>
        <table>
          <thead>
          <tr>
            <th>Position</th>
            <th>Applications</th>
            <th>Positons Offered</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>DevOps</td>
            <td>{stats.applied_count['DevOps']}</td>
            <td>{stats.offered_count['DevOps']}</td>
          </tr>

          <tr>
            <td>Developer</td>
            <td>{stats.applied_count['Developer']}</td>
            <td>{stats.offered_count['Developer']}</td>
          </tr>

          <tr>
            <td>Manager</td>
            <td>{stats.applied_count['Manager']}</td>
            <td>{stats.offered_count['Manager']}</td>
          </tr>

          <tr>
            <td>PM</td>
            <td>{stats.applied_count['PM']}</td>
            <td>{stats.offered_count['PM']}</td>
          </tr>

          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      <h1>Stats</h1>
      Loading...

    </div>
  );


};