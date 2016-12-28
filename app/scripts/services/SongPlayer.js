(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        var currentAlbum = Fixtures.getAlbum();
        /**
        *@desc Buzz object audio file
        *@type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        *@function setSong
        *@desc stops currently playing song and loads new audio file as currentBuzzObject
        *@param {Object} song
        */
        
        var setSong = function(song){
            if(currentBuzzObject){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
        
        var stopSong = function(song){
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        /**
        *@function playSong
        *@desc Plays currently loaded/selected audio file as currentBuzzObject
        @param {object} song
        */
        
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };
        
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        };

        /**
        *@function play
        *@desc Play current or new song
        *@param {Object} song
        */
        
        SongPlayer.currentSong = null;
        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song){
               setSong(song);
               playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                if(currentBuzzObject.isPaused()){
                    currentBuzzObject.play();
                }
            }
        };
        
        /**
        *@function pause
        *@desc Pause current song
        *@param {Object} song
        */
        
        SongPlayer.pause = function(song){
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if(currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if(currentSongIndex <= 0){
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();