﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CustomFramework
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class FCDatabaseEntities : DbContext
    {
        public FCDatabaseEntities()
            : base("name=FCDatabaseEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Application_Action> Application_Action { get; set; }
        public virtual DbSet<Application_Controller> Application_Controller { get; set; }
        public virtual DbSet<CarRequest> CarRequests { get; set; }
        public virtual DbSet<Car> Cars { get; set; }
        public virtual DbSet<CarSchedule> CarSchedules { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<CompEmployee> CompEmployees { get; set; }
        public virtual DbSet<DailyForm> DailyForms { get; set; }
        public virtual DbSet<EmployeeDetail> EmployeeDetails { get; set; }
        public virtual DbSet<General_RowStatus> General_RowStatus { get; set; }
        public virtual DbSet<Membership_Role> Membership_Role { get; set; }
        public virtual DbSet<Membership_User> Membership_User { get; set; }
        public virtual DbSet<OrderRequest> OrderRequests { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Schedule> Schedules { get; set; }
        public virtual DbSet<ServiceForm> ServiceForms { get; set; }
    }
}
