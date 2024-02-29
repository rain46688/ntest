import AssetListComponent from './asset_list_component';

export default async function AssetTypeComponent() {
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
                <AssetListComponent  />
            </table>
        </>
    );
}