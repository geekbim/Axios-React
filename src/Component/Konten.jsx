import React from 'react'

const Konten = (props) => {
    return (
        <div className="card mb-3 blog my-5">
            <div className="row no-gutters">
                <div className="col-md-4 py-2 pl-1">
                    <img src="https://placeimg.com/200/150/tech" className="card-img" alt="img"/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title text-left">{props.data.title}</h5>
                        <p className="card-text text-left">{props.data.body}</p>
                        <button type="button" className="update button btn-warning float-left rounded mb-3" onClick={() => {props.update(props.data)}}>Update</button>
                        <button type="button" className="remove button btn-danger float-left rounded mb-3 ml-2" onClick={() => {props.remove(props.data.id)}}>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Konten
