describe('myAppController', function(){
    beforeEach(module('starter'));
    var $control;
    
    beforeEach(inject(function(_$controller_){
        $control = _$controller_;
    }));
    
    describe('username', 'password', function(){
        it('Checking the login credentials', function(){
            
            var user = $scope.username();
            var pass = $scope.password();
            expect(user).toEqual('namrata');
            expect(pass).toEqual('namrata');
          expect(user).toEqual('1234');
            
                })
        });
    });
});
