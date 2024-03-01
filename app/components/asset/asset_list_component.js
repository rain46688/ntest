"use client"
import { useState, useEffect } from "react";

export default function AssetListComponent() {
    // 리스트 데이터 선언
    const [list, setList] = useState([]);

    // 체크박스 선택 여부를 관리할 상태
    const [selectedIds, setSelectedIds] = useState([]);

    // 리스트 데이터 가져오기
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + 'asset/getlist_asset_type/'+process.env.NEXT_PUBLIC_MEM_ID)
            .then(resp => resp.json())
            .then(result => {
                setList(result.data);
            })
    }, []);

    // 인풋 변경시에 이벤트 핸들러
    const handleInputChange = (e, id, field) => {
        console.log(" ==== handleInputChange ==== ");
        console.log("e : ", e);
        console.log("id : ", id);
        console.log("field : ", field);
        const newValue = e.target.value;
        console.log("newValue : ", newValue);
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
        console.log("e : ", e);
        console.log("id : ", id);
        console.log("field : ", field);
        // list에서 해당 아이디에 매칭되는 데이터를 뽑아옴
        const item = list.find(item => item.id === id);
        console.log("item : ",item);

        const data = JSON.stringify({
            "asset_type" : item.asset_type,
            "asset_class_1" : item.asset_class_1,
            "asset_class_2" : item.asset_class_2,
            "asset_name" : item.asset_name,
            "amount" : item.amount,
            "earning_rate" : item.earning_rate
        });
        const options = {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : data
        }
        fetch(process.env.NEXT_PUBLIC_API_URL + 'asset/update_asset/'+id, options)
        .then((res) => res.json())
        .then((result) =>{
            console.log("result : ", result);
            // 새로운 자산을 추가한 후에 리스트를 다시 불러옴
            fetch(process.env.NEXT_PUBLIC_API_URL + 'asset/getlist_asset_type/' + process.env.NEXT_PUBLIC_MEM_ID)
            .then(resp => resp.json())
            .then(result => {
                // 새로운 리스트 데이터로 상태 업데이트
                setList(result.data);
            });
        });

    };

    // 자산관리 추가
    const addAsset = (e) => {
        console.log(" ==== addAsset ====")
        const data = JSON.stringify({
            "member_id" : process.env.NEXT_PUBLIC_MEM_ID,
            "asset_type" : "",
            "asset_class_1" : "",
            "asset_class_2" : "",
            "asset_name" : "",
            "amount" : 0.00,
            "earning_rate" : 0.00
        });
        const options = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : data
        }
        fetch(process.env.NEXT_PUBLIC_API_URL + 'asset/add_asset', options)
        .then((res) => res.json())
        .then((result) =>{
            console.log("result : ", result);
            // 새로운 자산을 추가한 후에 리스트를 다시 불러옴
            fetch(process.env.NEXT_PUBLIC_API_URL + 'asset/getlist_asset_type/' + process.env.NEXT_PUBLIC_MEM_ID)
            .then(resp => resp.json())
            .then(result => {
                // 새로운 리스트 데이터로 상태 업데이트
                setList(result.data);
            });
        });
    };

    // 체크박스의 onChange 이벤트 핸들러
    const handleCheckboxChange = (e, id) => {
        if (e.target.checked) {
            // 체크박스가 선택되었을 때 selectedIds 상태에 id 추가
            setSelectedIds([...selectedIds, id]);
        } else {
            // 체크박스가 해제되었을 때 selectedIds 상태에서 id 제거
            setSelectedIds(selectedIds.filter(itemId => itemId !== id));
        }
    };

     // 자산관리 삭제
     const delAsset = (e) => {
        console.log(" ==== delAsset ====");
        console.log(" selectedIds : ",selectedIds);

        selectedIds.forEach(id => {
            console.log(id);

            const options = {
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json"
                }
            }
    
            fetch(process.env.NEXT_PUBLIC_API_URL + 'asset/delete_asset/'+id, options)
            .then((res) => res.json())
            .then((result) => {
                console.log("result : ", result);
                 // 새로운 자산을 추가한 후에 리스트를 다시 불러옴
                 fetch(process.env.NEXT_PUBLIC_API_URL + 'asset/getlist_asset_type/' + process.env.NEXT_PUBLIC_MEM_ID)
                 .then(resp => resp.json())
                 .then(result => {
                     // 새로운 리스트 데이터로 상태 업데이트
                     setList(result.data);
                 });
            });

        });
     }

    return (
        <>
            {/* 유형별 자산관리 리스트 조회 */}
            <button onClick={(e) => addAsset()}>+</button>
            <button onClick={(e) => delAsset()}>-</button>
            <table>
                <thead>
                    <tr>
                        <th></th>
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
                            <td><input type="checkbox" className="check" onChange={(e) => handleCheckboxChange(e, asset.id)}/></td>
                            <td>{asset.id}</td>
                            <td><input type="text" title="asset_type" value={asset.asset_type} onChange={(e) => handleInputChange(e, asset.id, 'asset_type')} onBlur={(e) => handleInputBlur(e, asset.id, 'asset_type')}></input></td>
                            <td><input type="text" title="asset_name" value={asset.asset_name} onChange={(e) => handleInputChange(e, asset.id, 'asset_name')} onBlur={(e) => handleInputBlur(e, asset.id, 'asset_name')}></input></td>
                            <td><input type="text" title="amount" value={asset.amount} onChange={(e) => handleInputChange(e, asset.id, 'amount')} onBlur={(e) => handleInputBlur(e, asset.id, 'amount')}></input></td>
                            <td><input type="text" title="earning_rate" value={asset.earning_rate} onChange={(e) => handleInputChange(e, asset.id, 'earning_rate')} onBlur={(e) => handleInputBlur(e, asset.id, 'earning_rate')}></input></td>
                            <td><input type="text" title="reg_date" value={asset.reg_date} onChange={(e) => handleInputChange(e, asset.id, 'reg_date')} onBlur={(e) => handleInputBlur(e, asset.id, 'reg_date')}></input></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}