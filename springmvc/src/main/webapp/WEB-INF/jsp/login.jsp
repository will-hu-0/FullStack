<%--
  Created by IntelliJ IDEA.
  User: will
  Date: 2019-08-10
  Time: 15:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="ctxPath" value="${pageContext.request.contextPath}" />
<html>
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>
<%--    <link rel="icon" href="../../favicon.ico"/>--%>

    <title>登录</title>

    <!-- Bootstrap core CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="${ctxPath}/assets/css/site.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.9.0/css/all.css"
          integrity="sha384-i1LQnF23gykqWXg6jxC2ZbCbUMxyw5gLZY6UiUS98LYV5unm8GWmfkIS6jqJfb4E"  crossorigin="anonymous" />
</head>
<body>
<div class="container">
    <div class="signin-header">
        <h2 class="signin-heading">SPRING MVC LOGIN</h2>
        <hr/>
    </div>

    <form class="form-signin col-12">
        <div class="form-group row">
            <label for="username" class="col-sm-2 col-form-label">Username</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="username" placeholder="Enter username">
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword" placeholder="Enter password">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-2"></div>
            <div class="col-sm-4">
                <img src="${ctxPath}/captcha_image" onclick="changeCaptcha('${ctxPath}')" width="120" height="40" alt="Captcha Code"/>
                <a href="javascript:void(0)" class="btn-refresh" onclick="changeCaptcha('${ctxPath }')">
                    <i class="fas fa-redo"></i>
                </a>
            </div>
            <div class="col-sm-6">
                <input class="form-control captcha-input" name="kaptcha" id="kaptcha" class="form-control"
                       placeholder="Enter Captcha" required="" autocomplete="off">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-6">
                <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
            </div>
            <div class="col-sm-6">
                <button class="btn btn-lg btn-primary btn-block">Reset</button>
            </div>
        </div>
    </form>

</div> <!-- /container -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin="anonymous"></script>
</body>
