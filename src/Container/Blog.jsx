import React, { Component } from 'react'
import './Blog.css'
import Konten from '../Component/Konten'
import axios from 'axios'

class Blog extends Component {

    state = {
        konten: [],
        formBlogPost: {
            'userId': 1,
            'id': 1,
            'title': '',
            'body': ''
        },
        isUpdate: false
    }

    // Menampilkan data
    getPostAPI = () => {
        axios.get('http://localhost:3004/posts?_sort=id&_order=desc')
        .then((response) => {
            this.setState({
                konten: response.data
            })
        })
    }

    // Post data to API and state
    postDataToAPI = () => {
        axios.post('http://localhost:3004/posts', this.state.formBlogPost)
        .then(() => {
            this.getPostAPI()
            this.setState({
                formBlogPost: {
                    'userId': 1,
                    'id': 1,
                    'title': '',
                    'body': ''
                }
            })
        }, (err) => {
            console.log('error: ', err)
        })

        if (true) {
            window.alert('Data Berhasil Ditambahkan')
        }
    }

    // Update data to API and state
    putDataToAPI = () => {
        axios.put(`http://localhost:3004/posts/${this.state.formBlogPost.id}`, this.state.formBlogPost)
        .then(() => {
            this.getPostAPI()
            this.setState({
                isUpdate: false,
                formBlogPost: {
                    'userId': 1,
                    'id': 1,
                    'title': '',
                    'body': ''
                }
            })
        })

        if (true) {
            window.alert('Data Berhasil Diupdate')
        }
    }

    // Input data ke API
    handleFormChange = (e) => {
        let formBlogPostNew = {...this.state.formBlogPost}
        let timestamp = new Date().getTime()
        if (!this.state.isUpdate) {
            formBlogPostNew['id'] = timestamp
        }
        formBlogPostNew[e.target.name] = e.target.value
        this.setState({
            formBlogPost: formBlogPostNew
        })
    }

    // Delete data
    handleRemove = (data) => {
        if (window.confirm('Yakin ingin menghapus data?')) {
            axios.delete(`http://localhost:3004/posts/${data}`)
            .then(() => {
                this.getPostAPI()
            })
        }
    }

    // Update data
    handleUpdate = (data) => {
        console.log(data)
        this.setState({
            formBlogPost: data,
            isUpdate: true
        })
    }

    handleSubmit = () => {
        if (this.state.isUpdate) {
            this.putDataToAPI()
        } else {
            this.postDataToAPI()
        }
    }

    componentDidMount() {
        this.getPostAPI()
    }

    render() {
        return (
            <div>
                <div className="card mb-3 blog my-5">
                    <form>
                        <div className="form-group">
                            <label htmlFor="title" className="float-left mt-3 px-3">Title</label>
                            <input type="text" className="form-control" name="title" id="title" placeholder="Add Title" value={this.state.formBlogPost.title} autoComplete="off" onChange={this.handleFormChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="body" className="float-left px-3">Blog Content</label>
                            <textarea type="text" className="form-control" name="body" id="body" rows="5" placeholder="Add Blog Content" value={this.state.formBlogPost.body} onChange={this.handleFormChange}/>
                        </div>
                        <button type="button" className="btn btn-outline-primary float-left mb-3 mx-3" onClick={this.handleSubmit}>Simpan</button>
                    </form>
                </div>

                {
                    this.state.konten.map((konten) => {
                        return <Konten key={konten.id} data={konten} remove={this.handleRemove} update={this.handleUpdate}/>
                    })
                }
            </div>
        )
    }
}

export default Blog
