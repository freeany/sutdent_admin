import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getStuByIdApi, deleteStuByIdApi } from '../api/stuApi.js'

/**
 * 学生详情组件
 * @param {*} props
 * @returns
 */
function Detail(props) {
	const navigate = useNavigate()
	const { id } = useParams()
	const [stu, setStu] = useState({
		name: '',
		age: '',
		phone: '',
		email: '',
		education: '',
		graduationschool: '',
		profession: '',
		profile: ''
	})

	useEffect(() => {
		getStuByIdApi(id).then(data => {
			setStu(data.data)
		})
	}, [id])

	function deleteStu() {
		if (window.confirm('你是否要删除此学生？')) {
			deleteStuByIdApi(id).then(() => {
				navigate('/home', {
					state: {
						message: '学生删除成功',
						type: 'info'
					}
				})
			})
		}
	}

	function editStu() {
		navigate(`/edit/${id}`)
	}

	return (
		<div className="details container">
			<button className="btn btn-default" onClick={() => navigate(-1)}>
				返回
			</button>
			<h1 className="page-header">
				{stu.name}
				<span className="pull-right">
					<button className="btn btn-primary" style={{ marginRight: 10 }} onClick={() => editStu()}>
						修改
					</button>
					<button className="btn btn-danger" onClick={() => deleteStu()}>
						删除
					</button>
				</span>
			</h1>
			{/* 第一组 */}
			<ul className="list-group">
				<li className="list-group-item">
					<span className="glyphicon glyphicon-phone">电话：{stu.phone}</span>
				</li>
				<li className="list-group-item">
					<span className="glyphicon glyphicon-envelope">邮箱：{stu.email}</span>
				</li>
			</ul>
			{/* 第二组 */}
			<ul className="list-group">
				<li className="list-group-item">
					<span className="glyphicon glyphicon-book">文化水平：{stu.education}</span>
				</li>
				<li className="list-group-item">
					<span className="glyphicon glyphicon-flag">毕业院校：{stu.graduationschool}</span>
				</li>
				<li className="list-group-item">
					<span className="glyphicon glyphicon-briefcase">专业：{stu.profession}</span>
				</li>
				<li className="list-group-item">
					<span className="glyphicon glyphicon-user">个人简介：{stu.profile}</span>
				</li>
			</ul>
		</div>
	)
}

export default Detail
