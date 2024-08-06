import React from 'react'

const AllToken = () => {
  return (
    <div>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Token Address</th>
        <th>Is Active</th>
        <th>Fee</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>0x2A28fcCb216000cfEb59A73bd43Eb6F041B97adC</td>
        <td>yes</td>
        <td>2$</td>
      </tr>
      {/* row 2 */}
      {/* <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr> */}
      {/* row 3 */}
      {/* <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr> */}
    </tbody>
  </table>
</div>
    </div>
  )
}

export default AllToken
