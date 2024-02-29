"use client"
import { useState, useEffect } from "react";

export default function AssetListComponent() {

    // 리스트 데이터 선언
    const [list, setList] = useState([]);

    // 리스트 데이터 가져오기
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL+'asset/getlist_asset_type/5')
        .then(resp=>resp.json())
        .then(result=>{
            setList(result.data);
        })
    }, []);

    // 인풋 변경시에 이벤트 핸들러
    const handleInputChange = (e, id, field) => {
        console.log(" ==== handleInputChange ==== ");
        console.log("e : ",e);
        console.log("id : ",id);
        console.log("field : ",field);
        const newValue = e.target.value;
        console.log("newValue : ",newValue);
        setList(prevList =>
            prevList.map(asset => {
                if (asset.id === id) {
                    return { ...asset, [field]: newValue };
                }
                return asset;
            })
        );
    };

    // 인풋에서 포커스 벗어날시 이벤트 핸들러
    const handleInputBlur = (e, id, field) => {
        console.log(" ==== handleInputBlur ==== ");
        console.log("e : ",e);
        console.log("id : ",id);
        console.log("field : ",field);
    };

    return (
        <tbody>
            {list.map((asset) => (
                <tr key={asset.id}>
                <td>{asset.id}</td>
                <td><input type="text" title="asset_type" value={asset.asset_type} onChange={(e) => handleInputChange(e, asset.id, 'asset_type')} onBlur={(e) => handleInputBlur(e, asset.id, 'asset_type')}></input></td>
                <td><input type="text" title="asset_name" value={asset.asset_name} onChange={(e) => handleInputChange(e, asset.id, 'asset_name')} onBlur={(e) => handleInputBlur(e, asset.id, 'asset_name')}></input></td>
                <td><input type="text" title="amount" value={asset.amount} onChange={(e) => handleInputChange(e, asset.id, 'amount')} onBlur={(e) => handleInputBlur(e, asset.id, 'amount')}></input></td>
                <td><input type="text" title="earning_rate" value={asset.earning_rate} onChange={(e) => handleInputChange(e, asset.id, 'earning_rate')} onBlur={(e) => handleInputBlur(e, asset.id, 'earning_rate')}></input></td>
                <td><input type="text" title="reg_date" value={asset.reg_date} onChange={(e) => handleInputChange(e, asset.id, 'reg_date')} onBlur={(e) => handleInputBlur(e, asset.id, 'reg_date')}></input></td>
            </tr>
            ))}
        </tbody>
    );
}