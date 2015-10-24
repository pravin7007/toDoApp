var Todo = angular.module('Todo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        if($scope.formData && $scope.formData.text){
            $http.post('/todos', $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.updateTodo = function(todo) {              
        $http.put('/todos/' + JSON.stringify(todo))
            .success(function(data) {
                $scope.todos = data;                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.archiveTodo = function(todo_id) {              
        $http.put('/archTodos/' + todo_id)
            .success(function(data) {
                $scope.todos = data;                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}