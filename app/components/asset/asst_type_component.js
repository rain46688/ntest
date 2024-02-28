export default async function AssetTypeComponent() {
    const resp = await fetch(process.env.API_URL+'asset/getlist_asset_type/5');
    const data = await resp.json();
    const list = data.data;
    console.log("list : ",list);
    return (
        <>
            {/* 유형별 자산관리 리스트 조회 */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Asset Type</th>
                        <th>Asset Name</th>
                        <th>Amount</th>
                        <th>Earning Rate</th>
                        <th>Reg Date</th>
                    </tr>
                </thead>
                <tbody>
                {list.map((asset) => (
                        <tr key={asset.id}>
                            <td>{asset.id}</td>
                            <td>{asset.asset_type}</td>
                            <td>{asset.asset_name}</td>
                            <td>{asset.amount}</td>
                            <td>{asset.earning_rate}</td>
                            <td>{asset.reg_date}</td>
                        </tr>  
                    ))}
                </tbody>
            </table>
        </>
    );
}