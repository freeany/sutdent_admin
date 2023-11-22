import React, { useEffect, useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { getStuListApi } from '../api/stuApi'
import Alert from './Alert'

export default function Home() {
	const [stuList, setStuList] = useState([])
	const [searchItem, setSearchItem] = useState([])
	const location = useLocation()
	const [alertInfo, setAlertInfo] = useState(null)
	useEffect(() => {
		getStuListApi().then(data => {
			setStuList(data.data)
		})
	}, [])

	useEffect(() => {
		if (location.state && location.state.message) {
			setAlertInfo(location.state)
		}
	}, [location])

	// 根据location 判断是否展示alert
	const alertMessage = alertInfo ? <Alert {...alertInfo} /> : null

	// 学生列表tr
	const stuListTr = stuList
		.filter(item => item.name.match(searchItem))
		.map((item, index) => {
			return (
				<tr key={index}>
					<td>{item.name}</td>
					<td>{item.age}</td>
					<td>{item.phone}</td>
					<td>
						<NavLink to={`/detail/${item.id}`}>详情</NavLink>
					</td>
				</tr>
			)
		})

	function searchStuList(e) {
		setSearchItem(e.target.value)
	}
	return (
		<div>
			{alertMessage}
			{/* 搜索框 */}
			<h1>学生列表</h1>
			<input className="form-control" type="text" placeholder="搜索" value={searchItem} onChange={e => searchStuList(e)} />

			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<td>姓名</td>
						<td>年龄</td>
						<td>联系方式</td>
						<td>操作</td>
					</tr>
				</thead>
				<tbody>{stuListTr}</tbody>
			</table>
		</div>
	)
}
