import React from "react";

export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">

                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">GoMobileCT</a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li>
                            <a href="#">Map / Locations</a>
                        </li>
                        <li>
                            <a href="#">Calendar</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container">

            <div class="row">
                <div class="col-lg-12 text-center">
                    <h1>GoMobileCT</h1>
                    <p class="lead">Yay! Server is running</p>
                    <ul class="list-unstyled">
                        <li>Bootstrap v3.3.7</li>
                        <li>jQuery v1.11.1</li>
                    </ul>
                </div>
            </div>

        </div>
      </div>
    );
  }
}
