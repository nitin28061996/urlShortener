
import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { createShortUrl, getAllUrls } from './Api'; 
const isUrl = require("is-valid-http-url");
class Home extends Component {
  constructor() {
    super();

    this.state = ({
      longUrl: "",
      urls: [],
      active_button : false,
      valid_url:false
    })
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    getAllUrls().then(res => {
      console.log(res)
      this.setState({
        urls: res.data
      })
    })

  }
  componentWillUnmount() {
    this.setState({
      longUrl: ""
    })
  }
  componentDidUpdate(){
    getAllUrls().then(res => {
      console.log(res)
      this.setState({
        urls: res.data
      })
    })

  }
  handleUserInput(e) {
    var longUrl=e.target.value;
    longUrl=longUrl.trim();
    console.log(longUrl)
    console.log(isUrl(longUrl))
    if(isUrl(longUrl)) {
      this.setState({ longUrl, active_button:true, valid_url:true });
    }else{
      this.setState({longUrl,active_button:false,valid_url:false})
    }
  }

  handleSubmit(e) {
    let reqObj = {
      longUrl: this.state.longUrl
    };
    createShortUrl(reqObj)

      .then(res => {
        this.setState({
          longUrl: this.state.longUrl,
          shortUrl: res.data.shortUrl
        });
      })

  }
  render() {
    console.log(this.state.urls)
    return (
      <div className="rootContainer">
      <div className="upper">
        <div className="header">
          <h1>Rethink URL Shortener</h1>
        </div>
        <div >
          <div >
            <form >
              <div className="formContainer">
                <div>

                  <h5>Enter Original URL</h5>
                </div>
                <div className="input">
                  <div className="long-url-input"> 
                  
                      <input type='url' className={
                        `
                        ${this.state.valid_url ? 'form-control valid':'form-control'}
                        `
                      }
                  
                       onChange={this.handleUserInput.bind(this)} value={this.state.longUrl} placeholder='Enter Link' /> &nbsp;&nbsp;
                   
                  </div>
                  <div>
                    <Button type="button" className="button" disabled={!this.state.active_button} onClick={this.handleSubmit}>Shrink</Button>
                  </div>
                </div>
                <div >
                  <h5>Your Short URL</h5>
                  <a target="_blank" rel="noopener noreferrer" refs="a" href={this.state.shortUrl}>
                    {this.state.shortUrl}
                  </a> &nbsp;&nbsp;
                  <CopyToClipboard text={this.state.shortUrl}>
                    <Button type="button" className="button">Copy Link</Button>
                  </CopyToClipboard>
                </div>
              </div>
            </form>
          </div>
        </div>
        </div>
        <div className="lower">
        <div className="lower-header">
          <h2>Recent 5 Shortened URLs</h2>
        </div>
        <div className="tableContainer table-responsive-sm">
          <table className="table table-bordered table-sm">
            <thead className="thead">
              <tr>
                <th >S.No.</th>
                <th >Long URL</th>
                <th>Short URL</th>

              </tr>
            </thead>
            <tbody>
              {this.state.urls.map((url, index) => {
                var longUrl = url.longUrl.toString()
                longUrl = longUrl.length > 100 ? longUrl.substring(0, 100) + "..." : longUrl;

                return (
                  <tr key={index}>
                    <td>
                      {index + 1}
                    </td>
                    <td style={{ backgroundColor: 'white' }}>
                      <a target="_blank" rel="noopener noreferrer" refs="a" href={url.longUrl}>
                        {
                          longUrl


                        }
                      </a> &nbsp;&nbsp;

                  </td>
                    <td style={{ backgroundColor: 'white' }}>

                      <a target="_blank" rel="noopener noreferrer" refs="a" href={url.shortUrl}>
                        {url.shortUrl}
                      </a> &nbsp;&nbsp;
                  </td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
</div>
    );
  }
}

export default Home;