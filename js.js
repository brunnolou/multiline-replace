function ReplaceCtrl($scope) {
    
  
  $scope.replaces = [];
  
  if(replace_length = window.localStorage.getItem("replace_length"))
  {
    for (var i = 1; i <= replace_length; i++)
    {
      $scope.replaces.push({text: window.localStorage.getItem("replace_" + i)});
    }
  }else{
    
    $scope.replaces = [
      {text: "1\n2\n3\n4\n5"},
      {text: "a\nb\nc\nd\ne"}
    ];
  }
  
  if(window.localStorage.getItem("input"))
    $scope.input = window.localStorage.getItem("input");
  else
    $scope.input = "'$1', '$2'";
  
  $scope.Math = window.Math;
  
  $scope.addReplace = function()
  {
    if($scope.replaces.length < 5)
      $scope.replaces.push({text:window.localStorage.getItem("replace_" + ($scope.replaces.length+1))});
      window.localStorage.setItem("replace_length", $scope.replaces.length);
      $scope.change();
  };
 
  $scope.removeReplace = function()
  {
    if($scope.replaces.length > 1)
      $scope.replaces.pop();
      window.localStorage.setItem("replace_length", $scope.replaces.length);
      $scope.change();
  };
  
 
  $scope.change = function ()
  {
    
    window.localStorage.setItem("input", $scope.input);
    
    lengths = _.map($scope.replaces, function (replace,i) {
      
      window.localStorage.setItem("replace_" + (i+1), replace.text);
      
      return replace.text.split("\n").length
    });
    
    max_replaces = 0;
    _.each(lengths, function (length){
      if(length > max_replaces )
        max_replaces = length;
    });

    result = $scope.input;
    final_result = '';
    for (var i = 0; i < max_replaces; i++)
    {
      replaces_idx = 1;
      
        _.each($scope.replaces, function (replace)
        {
          var reg     = new RegExp("\\$" + replaces_idx,"g");
          replace_str = replace.text.split("\n")[i];
          replace_str = replace_str ? replace_str : '';
          result      = result.replace(reg, replace_str) ;
      
          replaces_idx++;
        });
        
        final_result += result+ "\n";
        result = $scope.input;
    }
      
    
    // $scope.result = $scope.input.replace(/\$1/g, 'a');
    $scope.result = final_result;
    // $scope.result = result.join("\n");

  }

  $scope.change();
  
  $scope.updateReplace = function(idx, text)
  {
    $scope.replace[idx].text = text;
  };
 
  $scope.remaining = function()
  {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };
 
  $scope.archive = function()
  {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };

  $scope.sort = function (idx) {
    text = $scope.replaces[idx].text;
    text = text.split("\n").sort().join("\n");
    $scope.replaces[idx].text = text;
    $scope.change();
  }
}
