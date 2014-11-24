<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Laravel PHP Framework</title>
	<link rel="stylesheet" href="css/base.css">
	<script src="js/lib.js"></script>
	<script src="js/base.js"></script>

	<link rel="stylesheet" href="css/base.css">
	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">


</head>
<body>
<body class="container" ng-app="passwordApp" ng-controller="mainController">

	<div class="col-md-8 col-md-offset-2" >

		<div class="page-header">
			<h2>Passwords</h2>
			<h4>password system</h4>
		</div>

		<form ng-submit="submitPassword()">

			<div class="form-group">
				<select class="form-control" name="client_id" ng-model="passwordData.client" ng-options="opt as opt.title for opt in clients"></select>
			</div>

			<div class="form-group">
				<input type="text" class="form-control" required="true" name="name" ng-model="passwordData.name" placeholder="Name">
			</div>

			<div class="form-group">
				<input type="text" class="form-control" required="true" name="username" ng-model="passwordData.username" placeholder="Username">
			</div>

			<div class="form-group">
				<input type="text" class="form-control" required="true" name="password" ng-model="passwordData.password" placeholder="Password">
			</div>

			<div class="form-group">
				<input type="text" class="form-control" name="url" ng-model="passwordData.url" placeholder="URL">
			</div>

			<div class="form-group">
				<textarea class="form-control" rows="3" name="note" ng-model="passwordData.note" placeholder="make a note"></textarea>
			</div>

			<div class="form-group text-right">
				<button type="submit" class="btn btn-primary btn-lg">Submit</button>
			</div>

		</form>

		<p class="text-center" ng-show="loading"><i class="fa fa-cog fa-spin"></i></p>

		<table ng-hide="loading" class="table table-hover">
		  <thead>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Note</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="password in passwords">
				<td>{{ password.id }}</td>
				<td>{{ password.name }}</td>
				<td>{{ password.note }}</td>
				<td>
					<a ng-click="open(password.id)" href="#"><i class="fa fa-pencil"></i></a>
					<a href="#" ng-click="deletePassword(password.id)" class="text-muted"><i class="fa fa-trash"></i></a>
				</td>
			</tr>
		  </tbody>
		</table>

	</div>

</body>
</html>
