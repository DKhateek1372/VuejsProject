Vue.component( "book-list", {
  template: "#book-list-template",
  data: function() {
    return {
      showModal: false,
      bookUpdated: false,
      bookAdded: false,
      error: false,
      tasks: [
        {
          id: 1,
          title: "GOT",
          author: 'Nolan',
          isRead: false,
          created: Date.now(),
        },{
          id: 2,
          title: "GOT",
          author: 'Nolan',
          isRead: true,
          created: Date.now(),
        }
      ],
      newTask: {}
    }
  },
  created: function() {
    if ( localStorage.todoData ) {
      this.tasks = this.getData( "todoData" );
    } 
  },
  methods: {
    
    addTodo: function(row) {
      console.log(row)
      if (row.title.trim().length && row.type === 'add') {
        console.log('hre add');
        row.created = Date.now();
        row.id = this.tasks.length + 1;
        this.tasks.push(row);
        this.bookAdded = true;
        this.bookUpdated = false;
      } 
      else if (row.type === 'update') {
        this.tasks.forEach(function(task) {
          if (task.id === row.id) {
            task = row;
          }
        });
        this.bookUpdated = true;
        this.bookAdded = false;
      }
      this.showModal =false;
      this.setData( "todoData", this.tasks );
    },
    toggleTodoStatus: function(row, todoType) {
        this.showModal = true;
        row.type = todoType === 'add' ? 'add' : 'update';
        console.log(row.type)
        this.newTask = row;
        console.log('here is row', row);
    },
    deleteTodo: function( task ) {
      task.updated = Date.now();
      this.tasks.splice( this.tasks.indexOf( task ), 1 );
      this.setData( "todoData", this.tasks );
    },
    
    setData: function( key, data ) {
      var todoData = JSON.stringify( data );
      localStorage.setItem( key, todoData );
    },
    getData: function( key ) {
      var todoData = localStorage.getItem( key );
      return JSON.parse( todoData );
    },
    resetApp: function(row) {
      console.log(row, this.newTask, this.tasks);
      this.newTask = {};
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    showModal: true
  }
});
