
//************************************//
//**************Module****************//
//************************************//
var app = angular.module('WebSelfCare',['ui.bootstrap']);

app.controller('getInfoCtrl', function($scope, $http, $modal, $log) {




  $scope.key = "https://dev2.easiware.fr/7.2/easicrm.5.0.dev";
  $scope.putUrl = 'http://localhost:4567/put';
  $scope.getUrl = 'http://localhost:4567/getData';


  $scope.CheminComplet = document.location.href;
  $http.get($scope.getUrl,{
    params :{url :$scope.CheminComplet}
  }).success(function(data) {
    $scope.information = data;
    $scope.tab = $scope.information[0].value.articles
  });


  // $scope.testGetData = function(text)
  // {
  //   $http.get('http://localhost:4567/getSearchData/'+text,{ params: text }).success(function(data) {
  //     $scope.dataSearchText = data; 
  //     console.log($scope.dataSearchText);
  //   });
  //   return $scope.dataSearchText;
  // };
  
  $scope.indice = false;
  $scope.affViewsQuestion = true;
  $scope.affViewsSearch = true;
  $scope.affViewsPop = true;
  $scope.affNoReply = true;
  $scope.affForm = true;
  $scope.affFormSearch = true;
  $scope.afficheRepSearch = true;

  $scope.setSelectedCat = function(categorie) {
    $scope.selectedCategory = categorie;
    $scope.catSelected = categorie.categorie;
    $scope.indice = false;    
    $scope.pop = false;
    $scope.affiche = false;
    $scope.afficheRepSearch = true;
    $scope.afficheResSearch = false;
    $scope.afficheQuestion = false;
    $scope.aff = true;
    $scope.affViewsQuestion = true;
    $scope.affViewsSearch = true;
    $scope.affViewsPop = true;
    $scope.affNoReply = true;
    $scope.affForm = true;
    $scope.affFormSearch = true;



  };

  $scope.setSelectedQuestion = function(question) {
    $scope.selectedQuestion = question;
    $scope.indice = true;
    $scope.pop = false;
    $scope.affiche = true;
    $scope.afficheRepSearch = true;
    $scope.afficheResSearch = false;
    $scope.aff = true;
    
    $scope.affViewsQuestion = false;
    $scope.affViewsSearch = true;
    $scope.affViewsPop = true;
    $scope.affNoReply = false;
  $scope.affForm = true;
  $scope.affFormSearch = true;






    var count = parseFloat(question.nbViews)
    count += 1
    $http({
        method: 'POST',
        url: $scope.putUrl,
        data:  {
                // key : $scope.CheminComplet
                "key": $scope.key,
                "articles" : [
                    {
                      "id" : question.id,
                      "title" : question.title,
                      "categorie" : question.categorie,
                      "answer"  : question.answer,
                      "rate"    : question.rate,
                      "nbViews" : count,
                      "popular": question.popular
                    }
                  ]
                },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
  };

  $scope.setSelectedQuestionSearch = function(questionSearch) {
    $scope.selectedQuestionSearch = questionSearch;
    $scope.indice = false;
    $scope.pop = false;
    $scope.affiche = true;
    $scope.afficheResSearch = true;
    $scope.afficheRepSearch = false;

    $scope.aff = false;
    $scope.affViewsQuestion = true;
    $scope.affViewsSearch = false;
    $scope.affViewsPop = true;
    $scope.affNoReply = false;
  $scope.affForm = true;
  $scope.affFormSearch = true;



    for(i=0; i<$scope.tab.length; i++){
      if(questionSearch == $scope.tab[i].title){
        $scope.getAnswer = $scope.tab[i].answer;
      }
    }
    var count = parseFloat(questionSearch.nbViews);
    count += 1;

     $http({
        method: 'POST',
        url: $scope.putUrl,
        data:  {
                "key": $scope.key,
                "articles" : [
                    {
                      "id" : questionSearch.id,
                      "title" : questionSearch.title,
                      "categorie" : questionSearch.categorie,
                      "answer"  : questionSearch.answer,
                      "rate"    : questionSearch.rate,
                      "nbViews" : count,
                      "popular": questionSearch.popular
                    }
                  ]
                },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

  };


  $scope.setSelectedQuestionPop = function(questionPop) {
    $scope.selectedQuestionPop = questionPop;
    $scope.questionPopSelected = questionPop.title;
    $scope.pop = true;
    $scope.indice = false;
    $scope.affiche = false;
    $scope.afficheResSearch = false;
    $scope.afficheRepSearch = true;
    $scope.afficheQuestion = true;


    $scope.affViewsQuestion = true;
    $scope.affViewsSearch = true;
    $scope.affViewsPop = false;
    $scope.affNoReply = false;
    $scope.affForm = true;
    $scope.affFormSearch = true;
    $scope.aff = true;
    var count = parseFloat(questionPop.nbViews)
    count += 1
    $http({
        method: 'POST',
        url: $scope.putUrl,
        data:  {
                "key": $scope.key,
                "articles" : [
                    {
                      "id" : questionPop.id,
                      "title" : questionPop.title,
                      "categorie" : questionPop.categorie,
                      "answer"  : questionPop.answer,
                      "rate"    : questionPop.rate,
                      "nbViews" : count,
                      "popular": questionPop.popular
                    }
                  ]
                },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

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

    $scope.affViewsQuestion = true;
    $scope.affViewsSearch = true;
    $scope.affViewsPop = true;
    $scope.affNoReply = true;
    $scope.affForm = true;
    $scope.affFormSearch = true;



    var tabDf = [];
    var temp = "";

    for ( var i = 0; i < $scope.tabText.length; i++) {
      var df = 0;
      for (var j = 0; j < $scope.tab.length; j++ ) {
        var flags = 0;
        $scope.tabAnswer = $scope.tab[j].answer.split(' ');
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
        console.log(temp)
        tabDf.push(temp);
    }

    //Pour chaque mot clefs:
    for (var i = 0; i < $scope.tabText.length; i++) {
      //Pour chaque articles:
      for (var j = 0; j < $scope.tab.length; j++ ){
        $scope.tf = 0;
        //on récupère le champs "answer" qu'on split par l'espace pour isoler chaque mot:
        $scope.tabAnswer = $scope.tab[j].answer.split(' ');
        //Pour chaque mots:
         for(var k = 0; k < $scope.tabAnswer.length; k++){
          //Si le mot clef == à un mot du tableau answer: (et de longueur sup a 3)
          if ($scope.tabAnswer[k].length > 3 && 
             ($scope.tabText[i] == $scope.tabAnswer[k] || $scope.tabText[i]+',' == $scope.tabAnswer[k] )) {
            
            $scope.tf += 1;
            $scope.idArticle = $scope.tab[j].id;
          } 
        }
        
        for(var p = 0; p < tabDf.length; p++){
          if (tabDf[p].mot == $scope.tabText[i] && $scope.tf > 0 ) {
            var poid = {'id' : $scope.tab[j].id ,
                        'title' : $scope.tab[j].title ,
                        'answer' : $scope.tab[j].answer ,
                        'mot' : $scope.tabText[i] ,

                        'categorie' : $scope.tab[j].categorie,
                        'rate' : $scope.tab[j].rate,
                        'nbViews' : $scope.tab[j].nbViews,
                        'popular' : $scope.tab[j].popular,  

                        'tf' : $scope.tf , 
                        'df' : tabDf[p].df , 
                        'idf' : Math.log($scope.tab.length/tabDf[p].df), 
                        'weight': ($scope.tf*Math.log($scope.tab.length/tabDf[p].df+0.01))+((30*$scope.tab[j].nbViews)/100) };

            $scope.poids.push(poid); 

          }
        }
      }
    }

    //afficher les articles par poids comportant les mots clefs 
    $scope.tabPoid = [];
    for (var k = 0; k < $scope.tab.length; k++){
      for (var i = 0; i < $scope.poids.length; i++){
        for (var j = i+1; j < $scope.poids.length; j++){
          var idA = $scope.poids[i].id;
          if ($scope.tab[k].id == idA ) {
            if($scope.poids[i].id == $scope.poids[j].id){
              var pf = $scope.poids[i].weight + $scope.poids[j].weight;
              var poidFinal = {'id' : idA,
                               'weight': pf, 
                               'title': $scope.tab[k].title,
                               'answer' : $scope.tab[k].answer,
                               'categorie' : $scope.tab[k].categorie,
                               'rate' : $scope.tab[k].rate,
                               'nbViews' : $scope.tab[k].nbViews,
                               'popular' : $scope.tab[k].popular
                                };
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
  };

  $scope.formContact= function(){
    $scope.affForm = false;
    $scope.affFormSearch = false;


  }

  $scope.usefulAnswer = function(){
    $scope.affForm = true;
    $scope.affFormSearch = true;
  }

  $scope.returnFAQ = function(){
    $scope.affForm = true;
    $scope.affFormSearch = true;
  }

  $scope.submitContactForm = function(){
    $scope.affForm = true;
    $scope.affFormSearch = true;
  }

});




// app.controller('postInfoCtrl', function($scope, $http) {
//     $scope.addArticle = function(titre) {
//       var temp = {
//         title: titre
//       }

//       $http({
//           method: 'POST',
//           url: 'http://localhost:4567/test',
//           data: titre,
//           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//       })


//     }

//   });


//************************************//
//**************Filtres***************//
//************************************//

//Remove doublons
app.filter('unique', function (){
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
      
