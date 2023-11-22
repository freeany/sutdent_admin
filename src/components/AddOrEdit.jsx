import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addStuApi, getStuByIdApi, editStuByIdApi } from '../api/stuApi'
/**
 * 该组件有两个功能，一个是添加学生，另一个是修改学生
 * @param {*} props
 * @returns
 */
const stuData = {
	name: '1',
	age: '2',
	phone: '3',
	email: '4',
	education: '本科',
	graduationschool: '5',
	profession: '6',
	profile: '7'
}
function AddOrEdit(props) {
	const { id } = useParams()
	const navigation = useNavigate()

	const [stuInfo, setStuInfo] = useState({ ...stuData })

	useEffect(() => {
		if (id) {
			getStuByIdApi(id).then(data => {
				setStuInfo(data.data)
			})
		} else {
			setStuInfo({ ...stuData })
		}
	}, [id])

	function changeForm(e, key) {
		setStuInfo({
			...stuInfo,
			[key]: e.target.value
		})
	}

	function submit(e) {
		e.preventDefault()
		for (const key in stuInfo) {
			if (!key) {
				alert('请完善每一项')
				return
			}
		}
		const p = id ? () => editStuByIdApi(id, stuInfo) : () => addStuApi(stuInfo)
		p().then(data => {
			navigation('/home', {
				state: {
					message: id ? '编辑学生信息成功' : '添加学生信息成功',
					type: 'success'
				}
			})
		})
	}
	return (
		<div className="container">
			{/* 标题 */}
			<h1 className="page-header">{id ? '编辑学生' : '添加学生'}</h1>
			<form id="myForm" onSubmit={e => submit(e)}>
				<div className="well">
					<div className="form-group">
						<label>姓名</label>
						<input type="text" className="form-control" placeholder="请填写用户姓名" value={stuInfo.name} onChange={e => changeForm(e, 'name')} />
					</div>
					<div className="form-group">
						<label>年龄</label>
						<input type="text" className="form-control" placeholder="请填写用户年龄" value={stuInfo.age} onChange={e => changeForm(e, 'age')} />
					</div>
					<div className="form-group">
						<label>电话</label>
						<input type="text" className="form-control" placeholder="请填写用户电话号码" value={stuInfo.phone} onChange={e => changeForm(e, 'phone')} />
					</div>
					<div className="form-group">
						<label>邮箱</label>
						<input type="text" className="form-control" placeholder="请填写用户邮箱地址" value={stuInfo.email} onChange={e => changeForm(e, 'email')} />
					</div>
					<div className="form-group">
						<label>学历</label>
						<select className="form-control" value={stuInfo.education} onChange={e => changeForm(e, 'education')}>
							<option>小学</option>
							<option>初中或职中</option>
							<option>高中或职高</option>
							<option>专科</option>
							<option>本科</option>
							<option>硕士</option>
							<option>博士</option>
						</select>
					</div>
					<div className="form-group">
						<label>毕业学校</label>
						<input
							type="text"
							className="form-control"
							placeholder="请填写用户毕业院校"
							value={stuInfo.graduationschool}
							onChange={e => changeForm(e, 'graduationschool')}
						/>
					</div>
					<div className="form-group">
						<label>职业</label>
						<input
							type="text"
							className="form-control"
							placeholder="请填写用户从事的相关职业"
							value={stuInfo.profession}
							onChange={e => changeForm(e, 'profession')}
						/>
					</div>
					<div className="form-group">
						<label>个人简介</label>
						<textarea
							className="form-control"
							rows="10"
							placeholder="请简单的介绍一下你自己，包括兴趣、爱好等信息..."
							value={stuInfo.profile}
							onChange={e => changeForm(e, 'profile')}
						></textarea>
					</div>
					<button type="submit" className="btn btn-primary">
						确认添加
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddOrEdit
