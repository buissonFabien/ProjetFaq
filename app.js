angular.module("WebSelfCare", [])
.controller('getInfoCtrl', function($scope, $http) {


  $http.get('http://fathomless-brook-5557.herokuapp.com/getData').success(function(data) {
    $scope.information = data;
  });
  


  // $scope.testGetData = function(text)
  // {
  //   $http.get('http://localhost:4567/getSearchData/'+text,{ params: text }).success(function(data) {
  //     $scope.dataSearchText = data; 
  //     console.log($scope.dataSearchText);
  //   });
  //   return $scope.dataSearchText;
  // };
  
  $scope.indice = true;

  $scope.setSelectedCat = function(category) {
    $scope.selectedCategory = category;
    $scope.catSelected = category.categorie;
    $scope.indice = false;    
    $scope.pop = false;
    $scope.affiche = false;
    $scope.afficheRepSearch = true;
    $scope.afficheResSearch = false;
    $scope.afficheQuestion = false;
    $scope.aff = true;
  };

  $scope.setSelectedQuestion = function(question) {
    $scope.selectedQuestion = question;
    $scope.questionSelected = question.title;
    $scope.indice = true;
    $scope.pop = false;
    $scope.affiche = true;
    $scope.afficheRepSearch = true;
    $scope.afficheResSearch = false;
    $scope.aff = true;

  };

  $scope.setSelectedQuestionSearch = function(questionSearch) {
    $scope.selectedQuestionSearch = questionSearch;
    $scope.indice = false;
    $scope.pop = false;
    $scope.affiche = true;
    $scope.afficheResSearch = true;
    $scope.afficheRepSearch = false;

    $scope.aff = false;


    for(i=0; i<$scope.information.length; i++)
      if(questionSearch == $scope.information[i].title)
        $scope.getAnswer = $scope.information[i].answer;
  };

  $scope.setSelectedQuestionPop = function(questionPop) {
    $scope.selectedQuestionPop = questionPop;
    $scope.questionPopSelected = questionPop.title;
    $scope.pop = true;
    $scope.indice = false;
    $scope.affiche = false;
    $scope.afficheResSearch = false;
    $scope.afficheRepSearch = true;

    $scope.aff = true;

  };


  // $scope.sendData = function() {
  //   var dataToPost = $scope.dataSend; /* PostData*/
  //   var queryParams = {id:5};/* Query Parameters*/
  //   $http.post("http://localhost:4567/post", dataToPost, queryParams)
  //     .success(function(body, status, headers, config) {
  //         console.log ("ok");
  //     })
  //     .error(function(serverResponse, status, headers, config) {
  //       alert("failure");
  //     })
  // };
  
 $scope.searchByKeywords = function(text) {
    $scope.indice = false;    
    $scope.pop = false;
    $scope.afficheResSearch = true;
    $scope.afficheRepSearch = false;

    $scope.nombre = 0;
    $scope.tabText = [];
    $scope.result = [];
    $scope.tabText = text.split(' ');
    $scope.nombre = text.split(' ').length; 
    $scope.tabKeyWord = [];
    $scope.affiche = true;
    //boucle sur les mots clefs tapés par l'utilisateur
    for (var i = 0; i < $scope.tabText.length; i++) {
      //boucle sur tout les articles
      for (var j = 0; j < $scope.information.length; j++ ){
        $scope.tabKeyWord = $scope.information[j].keywords.split(' ');
        for (var k = 0; k < $scope.tabKeyWord.length; k++) {
          if ($scope.tabText[i] == $scope.tabKeyWord[k] && $scope.tabText[i] != ' ')
            $scope.result[j] = $scope.information[j].title;
        }
      }
    }
  };



//************************************//
//**************algo tfidf************//
//************************************//
  $scope.tfidf = function(text){
    $scope.poids = [];
    $scope.tabText = [] ;
    $scope.tabText = text.split(' ');
    $scope.tabAnswer = [];
    $scope.idArticle = 0;

    $scope.indice = false;  
    $scope.pop = false;
    $scope.afficheResSearch = true;
    $scope.afficheRepSearch = true;
    $scope.affiche = false;
    $scope.afficheQuestion = true;
    $scope.aff = false;



    var tabDf = [];
    var temp = "";

    for ( var i = 0; i < $scope.tabText.length; i++) {
      var df = 0;
      for (var j = 0; j < $scope.information.length; j++ ) {
        var flags = 0;
        $scope.tabAnswer = $scope.information[j].answer.split(' ');
        for(var k = 0; k < $scope.tabAnswer.length; k++) {
          if ($scope.tabText[i] == $scope.tabAnswer[k] || $scope.tabText[i]+',' == $scope.tabAnswer[k]  ) {
            flags = 1;
          }
        }
        if (flags == 1) {
          df += 1;
        }

      }
        temp = {'mot' : $scope.tabText[i] , 'df' : df};
        tabDf.push(temp);
    }

    //Pour chaque mot clefs:
    for (var i = 0; i < $scope.tabText.length; i++) {
      //Pour chaque articles:
      for (var j = 0; j < $scope.information.length; j++ ){
        $scope.tf = 0;
        //on récupère le champs "answer" qu'on split par l'espace pour isoler chaque mot:
        $scope.tabAnswer = $scope.information[j].answer.split(' ');
        //Pour chaque mots:
         for(var k = 0; k < $scope.tabAnswer.length; k++){
          //Si le mot clef == à un mot du tableau answer: (et de longueur sup a 3)
          if ($scope.tabAnswer[k].length > 3 && 
             ($scope.tabText[i] == $scope.tabAnswer[k] || $scope.tabText[i]+',' == $scope.tabAnswer[k] )) {
            
            $scope.tf += 1;
            $scope.idArticle = $scope.information[j].id;
          } 
        }
        
        for(var p = 0; p < tabDf.length; p++){
          if (tabDf[p].mot == $scope.tabText[i] && $scope.tf > 0 ) {
            var poid = {'id' : $scope.information[j].id ,
                        'title' : $scope.information[j].title ,
                        'answer' : $scope.information[j].answer ,
                        'mot' : $scope.tabText[i] ,
                        'tf' : $scope.tf , 
                        'df' : tabDf[p].df , 
                        'idf' : Math.log($scope.information.length/tabDf[p].df), 
                        'weight': $scope.tf*Math.log($scope.information.length/tabDf[p].df) };

            $scope.poids.push(poid); 

          }
        }
      }
    }

    //afficher les articles par poids comportant les mots clefs 
    $scope.tabPoid = [];
    for (var k = 0; k < $scope.information.length; k++){
      for (var i = 0; i < $scope.poids.length; i++){
        for (var j = i+1; j < $scope.poids.length; j++){
          var idA = $scope.poids[i].id;
          if ($scope.information[k].id == idA ) {
            if($scope.poids[i].id == $scope.poids[j].id){
              var pf = $scope.poids[i].weight + $scope.poids[j].weight;
              var poidFinal = {'id' : idA,
                               'weight': pf, 
                               'title': $scope.information[k].title,
                               'answer' : $scope.information[k].answer };
              $scope.tabPoid.push(poidFinal);
            }
          } 
        }
      }
    }
    console.log($scope.tabPoid)
    console.log($scope.poids)

    

    for (var k = 0; k < $scope.tabPoid.length; k++){
      for (var i = 0; i < $scope.poids.length; i++){
        if($scope.tabPoid[k].id == $scope.poids[i].id){
          $scope.poids.splice(i,1);
        }
      }
    }

    $scope.tabFinalPoids = [];

    console.log($scope.poids)
    $scope.tabFinalPoids = $scope.tabPoid.concat($scope.poids)

    // console.log($scope.tabFinalPoids)



  };

})

 
.controller('postInfoCtrl', function($scope, $http) {
    $scope.addArticle = function(titre) {
    //   $http.post("http://localhost:4567/testPost").success(function(data, status) {
    //     $scope.titre = titre;
    //     data = $scope.titre;
    //     console.log(data)
    //     console.log("ok")
    //   });
    // }


    $http.post("http://localhost:4567/test", titre).success(function (data){
      console.log(data);
    });
  }
})



//************************************//
//**************Filtres***************//
//************************************//

//Remove doublons
.filter('unique', function (){
  return function (items, filterOn) {
    if (filterOn === false) {
      return items;
    }
    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];
      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };
      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;
        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }
      });
      items = newItems;
    }
    return items;
  };
});
