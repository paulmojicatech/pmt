﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Pmt.FantalyticApi.Models;

#nullable disable

namespace Pmt.FantalyticApi.Migrations
{
    [DbContext(typeof(FantalyticContext))]
    [Migration("20220911102913_2022-09-11-0629")]
    partial class _202209110629
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Pmt.FantalyticApi.Models.QB", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Ints")
                        .HasColumnType("integer");

                    b.Property<int>("PassingYds")
                        .HasColumnType("integer");

                    b.Property<float>("PassingYdsPerAttempt")
                        .HasColumnType("real");

                    b.Property<string>("Player")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Tds")
                        .HasColumnType("integer");

                    b.Property<int>("Week")
                        .HasColumnType("integer");

                    b.Property<int>("Year")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("QBs");
                });

            modelBuilder.Entity("Pmt.FantalyticApi.Models.RB", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Player")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("RushAttempts")
                        .HasColumnType("integer");

                    b.Property<int>("Rushing20Yds")
                        .HasColumnType("integer");

                    b.Property<int>("RushingTds")
                        .HasColumnType("integer");

                    b.Property<int>("RushingYds")
                        .HasColumnType("integer");

                    b.Property<int>("Week")
                        .HasColumnType("integer");

                    b.Property<int>("Year")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("RBs");
                });

            modelBuilder.Entity("Pmt.FantalyticApi.Models.WR_TE", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Player")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Receiving20Plus")
                        .HasColumnType("integer");

                    b.Property<int>("Receiving40Plus")
                        .HasColumnType("integer");

                    b.Property<int>("ReceivingTargets")
                        .HasColumnType("integer");

                    b.Property<int>("ReceivingTds")
                        .HasColumnType("integer");

                    b.Property<int>("ReceivingYds")
                        .HasColumnType("integer");

                    b.Property<int>("Receptions")
                        .HasColumnType("integer");

                    b.Property<int>("Week")
                        .HasColumnType("integer");

                    b.Property<int>("Year")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("WRs_TEs");
                });
#pragma warning restore 612, 618
        }
    }
}
