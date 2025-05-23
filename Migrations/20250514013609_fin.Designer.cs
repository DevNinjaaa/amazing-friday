﻿// <auto-generated />
using System;
using CarShare.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CarShare.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250514013609_fin")]
    partial class fin
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("CarShare.Models.Car", b =>
                {
                    b.Property<int>("CarId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CarId"));

                    b.Property<DateTime>("AvailableAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<int>("Doors")
                        .HasColumnType("integer");

                    b.Property<string>("FuelType")
                        .HasColumnType("text");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("text");

                    b.Property<bool>("IsRented")
                        .HasColumnType("boolean");

                    b.Property<string>("LicensePlate")
                        .HasColumnType("text");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("OwnerId")
                        .HasColumnType("integer");

                    b.Property<double>("PricePerDay")
                        .HasColumnType("double precision");

                    b.Property<double?>("Rating")
                        .HasColumnType("double precision");

                    b.Property<int?>("Reviews")
                        .HasColumnType("integer");

                    b.Property<int>("Seats")
                        .HasColumnType("integer");

                    b.Property<int>("Transmission")
                        .HasColumnType("integer");

                    b.Property<int>("Year")
                        .HasColumnType("integer");

                    b.HasKey("CarId");

                    b.HasIndex("OwnerId");

                    b.ToTable("Car");
                });

            modelBuilder.Entity("CarShare.Models.CarPost", b =>
                {
                    b.Property<int>("CarPostId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CarPostId"));

                    b.Property<int>("ApprovalStatus")
                        .HasColumnType("integer");

                    b.Property<DateTime>("AvailableFrom")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("AvailableTo")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("CarId")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("LocationId")
                        .HasColumnType("integer");

                    b.Property<int>("OwnerId")
                        .HasColumnType("integer");

                    b.Property<int>("RentalStatus")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("CarPostId");

                    b.HasIndex("CarId");

                    b.HasIndex("LocationId");

                    b.HasIndex("OwnerId");

                    b.ToTable("CarPosts");
                });

            modelBuilder.Entity("CarShare.Models.CarProposal", b =>
                {
                    b.Property<int>("CarProposalId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CarProposalId"));

                    b.Property<int>("CarId")
                        .HasColumnType("integer");

                    b.Property<int>("CarPostId")
                        .HasColumnType("integer");

                    b.Property<string>("LicenseDocumentPath")
                        .HasColumnType("text");

                    b.Property<string>("ProposalDocumentPath")
                        .HasColumnType("text");

                    b.Property<int>("RenterId")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<DateTime>("SubmittedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("CarProposalId");

                    b.HasIndex("CarId");

                    b.HasIndex("CarPostId");

                    b.HasIndex("RenterId");

                    b.ToTable("CarProposals");
                });

            modelBuilder.Entity("CarShare.Models.Feedback", b =>
                {
                    b.Property<int>("FeedbackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("FeedbackId"));

                    b.Property<int>("CarId")
                        .HasColumnType("integer");

                    b.Property<string>("Comment")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Rate")
                        .HasColumnType("integer");

                    b.Property<int>("RenterId")
                        .HasColumnType("integer");

                    b.HasKey("FeedbackId");

                    b.HasIndex("CarId");

                    b.HasIndex("RenterId");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("CarShare.Models.Location", b =>
                {
                    b.Property<int>("LocationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("LocationId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("character varying(250)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("LocationId");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("CarShare.Models.Request", b =>
                {
                    b.Property<int>("RequestId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("RequestId"));

                    b.Property<int>("ApprovalStatus")
                        .HasColumnType("integer");

                    b.Property<int?>("CarPostId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("RequestedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("RequestId");

                    b.HasIndex("CarPostId");

                    b.HasIndex("UserId");

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("CarShare.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("UserId"));

                    b.Property<bool>("CarOwner")
                        .HasColumnType("boolean");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Renting")
                        .HasColumnType("boolean");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CarShare.Models.Car", b =>
                {
                    b.HasOne("CarShare.Models.User", "Owner")
                        .WithMany("Car")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("CarShare.Models.CarPost", b =>
                {
                    b.HasOne("CarShare.Models.Car", "Car")
                        .WithMany()
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarShare.Models.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarShare.Models.User", "Owner")
                        .WithMany("CarPosts")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Car");

                    b.Navigation("Location");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("CarShare.Models.CarProposal", b =>
                {
                    b.HasOne("CarShare.Models.Car", "Car")
                        .WithMany()
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarShare.Models.CarPost", "CarPost")
                        .WithMany()
                        .HasForeignKey("CarPostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarShare.Models.User", "Renter")
                        .WithMany("Proposals")
                        .HasForeignKey("RenterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Car");

                    b.Navigation("CarPost");

                    b.Navigation("Renter");
                });

            modelBuilder.Entity("CarShare.Models.Feedback", b =>
                {
                    b.HasOne("CarShare.Models.Car", "Car")
                        .WithMany("Feedbacks")
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarShare.Models.User", "Renter")
                        .WithMany()
                        .HasForeignKey("RenterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Car");

                    b.Navigation("Renter");
                });

            modelBuilder.Entity("CarShare.Models.Request", b =>
                {
                    b.HasOne("CarShare.Models.CarPost", "CarPost")
                        .WithMany()
                        .HasForeignKey("CarPostId");

                    b.HasOne("CarShare.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CarPost");

                    b.Navigation("User");
                });

            modelBuilder.Entity("CarShare.Models.Car", b =>
                {
                    b.Navigation("Feedbacks");
                });

            modelBuilder.Entity("CarShare.Models.User", b =>
                {
                    b.Navigation("Car");

                    b.Navigation("CarPosts");

                    b.Navigation("Proposals");
                });
#pragma warning restore 612, 618
        }
    }
}
