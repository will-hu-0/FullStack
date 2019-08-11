<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="ctxPath" value="${pageContext.request.contextPath}" />
<html>
<head>
    <title>Dummy page</title>
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
        <h2 class="signin-heading">Dummy page only can be viewed if have logged in.</h2>
        <hr/>
        <div class="form-signin col-12">
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Username</label>
                <div class="col-sm-10">
                    <input type="text" disabled class="form-control" value="${username}">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" disabled class="form-control" value="${email}">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Is Admin?</label>
                <div class="col-sm-10">
                    <input type="text" disabled class="form-control" value="${isAdmin}">
                </div>
            </div>
            <div class="form-group row">
                <div class="float-right">
                    <a href="${ctxPath}/logout">logout</a>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
