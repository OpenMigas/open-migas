module.exports = function History(root){
    var history = root ? [root] : [];
    var position = 0;
    this.add = function(path){
        history.splice(position + 1);
        history.push(path);
        position = history.length - 1;
    }
    this.goBack = function(){
        if (position > 0) position--;
    }
    this.goForward = function(){
        if (position < history.length - 1) position++;
    }
    this.goUp = function(){
        this.add(path.resolve(this.getCurrentLocation(), '../'));
    }
    this.getCurrentLocation = function(){
        return history[position];
    }
    this.getHistoryPath = function(){
        return history;
    }
}